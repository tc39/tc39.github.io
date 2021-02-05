/**
 * @file Synchronizes local proposal data with upstream GitHub proposal data.
 * @author Derek Lewis <DerekNonGeneric@inf.is>
 */
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
import { curlyQuote, mdCodeSpans2html } from '@openinf/util-text';
import { GhFileImporter } from '@openinf/gh-file-importer';
import { mdTbl2json } from '@openinf/util-md-table';
import { hasOwn } from '@openinf/util-object';
import { promises as fsp, readFileSync } from 'fs';
import { resolve as pathResolve } from 'path';
import { toArray } from '@openinf/util-types';
import consoleLogLevel from 'console-log-level';
import sanitizeHtml from 'sanitize-html';
import yaml from 'js-yaml';
const DIR_DATA = '_data';
const FILE_PROPOSAL_DATA = pathResolve(DIR_DATA, 'stage3.yml');
const log = consoleLogLevel({ level: 'info' });
const ghFileImporter = new GhFileImporter({ destDir: 'tmp', log: log, });
const proposalsReadmeMd = await ghFileImporter.fetchFileContents('tc39', 'proposals', 'README.md');
// -----------------------------------------------------------------------------
// Events
// -----------------------------------------------------------------------------
process.on('uncaughtException', (err) => {
    log.error(err);
});
process.on('unhandledRejection', (wrn) => {
    log.warn(wrn);
});
// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
// > A 'full reference link' consists of a 'link text' immediately followed by a
// > 'link label' that matches a link reference definition elsewhere in the
// > document.
// @see https://github.github.com/gfm/#full-reference-link
//
// [foo][bar]
//   ^    ^----------- link label
//   |---------------- link text
//
// @example ```markdown
// [foo][bar]
//
//
// bar: http://foo.bar
// ```
function isFullRefLink(cellContents) {
    return cellContents.startsWith('['); // Oversimplified, but good enough.
}
/**
 * @param {string} fullRefLink
 * @param {number} index The 'full reference link' partition index (0 for the
 *     'link text', 1 for the 'link label').
 * @returns {string} A full reference link partition's contents.
 */
function getFullRefLinkContent(fullRefLink, index) {
    const array = fullRefLink.split('][');
    return index === 0 ? array[index].slice(1) : array[index].slice(0, -1);
}
/**
 * Gets the URL from the partial 'link text' of a 'full reference link' in the
 * proposal repo's README file.
 */
function getUrlFromDoc(linkTextLike) {
    const linkTextLikeRegex = new RegExp(`\\[${linkTextLike}.*\\]: (.*)`, 'g');
    return linkTextLikeRegex.exec(String(proposalsReadmeMd))[1];
}
/**
 * First checks `stage3.yml` for pre-existing code sample. If present,
 * uses that. If missing, remains missing. In the case of new proposals,
 * the following occurs.
 *
 * Downloads the proposal's README file using the GitHub API, parses the
 * Markdown file, and returns the contents of the JavaScript code block.
 *
 * If there are multiple matching JavaScript code blocks, the one that comes
 * last in the document is used. If there are no matching JavaScript code
 * blocks, returns `undefined`.
 */
async function getCodeSample(prpslId) {
    const prpslData = yaml.load(readFileSync(FILE_PROPOSAL_DATA, 'utf8'));
    let codeSample = null;
    prpslData.forEach(value => {
        if (hasOwn(value, 'id') && value.id === prpslId)
            hasOwn(value, 'example') ? codeSample = value.example : codeSample = undefined;
    });
    // The example was either already filled out manually or simply did not
    // have one (which is fine), so return our discovery early and avoid parsing
    // remote proposal repo READMEs.
    if (codeSample != null)
        return codeSample;
    // Fetch the file contents and parse out the code samples.
    const contents = await ghFileImporter.fetchFileContents('tc39', prpslId, 'README.md');
    const codeBlockRegex = new RegExp(/```[a-z]*\n[\s\S]*?\n```\n/g);
    let codeBlocks = toArray(codeBlockRegex.exec(contents));
    return codeBlocks.length > 0 ?
        codeBlocks.pop()?.replace(/```(.?)*?\n+/gm, '') : undefined;
}
function getPrpslId(linkTextLike) {
    let prpslUrl = getUrlFromDoc(linkTextLike);
    if (prpslUrl.endsWith('/'))
        prpslUrl = prpslUrl.slice(0, -1); // Lose trailing slashes to prevent crash.
    const prpslId = String(prpslUrl
        ?.split('/')
        ?.pop()
        ?.toLowerCase());
    return prpslId;
}
/** Checks if the proposal has a spec using the files listed by the GitHub API. */
async function hasSpec(prpslId) {
    let isFound = false;
    const result = await ghFileImporter.fetchMetadata('tc39', prpslId);
    result.data.forEach((value) => {
        if (value.path === 'spec.html')
            isFound = true;
    });
    return isFound;
}
function json2yaml(buffer, options) {
    const src = JSON.parse(buffer.toString());
    const yamlDocument = yaml.dump(src, options);
    return Buffer.from(yamlDocument);
}
/**
 * Gets the proposal short description.
 *
 * First checks `stage3.yml` for pre-existing short description. If present,
 * uses that. If missing, fetches them from the GitHub repo.
 */
async function getShortDescription(prpslId) {
    let description;
    const prpslData = yaml.load(readFileSync(FILE_PROPOSAL_DATA, 'utf8'));
    prpslData.forEach(value => {
        if (hasOwn(value, 'id') && value.id === prpslId) {
            // Proposal description has already has already been filled out, use that.
            hasOwn(value, 'description') ? description = value.description : description = undefined;
        }
    });
    if (!description) {
        // The proposal is missing from the dataset, so use the description on GitHub repo.
        const repoMetadata = await ghFileImporter.fetchMetadata('tc39', prpslId);
        description = repoMetadata.data.description;
    }
    log.info(`Description for ${curlyQuote(prpslId)}: ${description}`);
    return description;
}
/** Populates a PresenceObj from a ProposalStageTableRecord object. */
function presenceObjFrom(valObj) {
    let lastPresentedVal = valObj.last_presented;
    // lastPresentedVal can either be:
    // - a full reference link: <sub>[December&#xA0;2019][nonblocking-notes]</sub>
    // - just a date: <sub>September&#xA0;2020</sub>
    lastPresentedVal = sanitizeHtml(lastPresentedVal, { allowedTags: [] });
    const presenceObj = { date: '', url: undefined };
    if (isFullRefLink(lastPresentedVal)) {
        presenceObj.date = getFullRefLinkContent(lastPresentedVal, 0);
        presenceObj.url = getUrlFromDoc(getFullRefLinkContent(lastPresentedVal, 1));
    }
    else {
        presenceObj.date = lastPresentedVal;
        presenceObj.url = undefined;
    }
    return presenceObj;
}
// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------
const tblRegex = new RegExp(/(### Stage 3\n\n)([.+?\s\S]+)(\n\n### Stage 2)/g);
const markdownTbl = tblRegex.exec(String(proposalsReadmeMd))[2];
const jsonTbl = mdTbl2json(markdownTbl, (val) => sanitizeHtml(String(val), { allowedTags: ['code', 'br'] }), (val) => sanitizeHtml(String(val).toLowerCase().replace(' ', '_'), { allowedTags: [] }));
// Now, with our stage 3 table in JSON form, we must take what we need from each
// row and use the cell contents to construct our ProposalRecord data structure
// prior to making the JSON -> YAML conversion.
// -----------------------------------------------------------------------------
const prpslRcrdPromiseArr = jsonTbl.map(async (value) => {
    const prpslRcrdId = getPrpslId(getFullRefLinkContent(value.proposal, 1));
    const prpslRcrd = {
        id: prpslRcrdId,
        authors: value.author.split('<br />'),
        champions: value.champion.split('<br />'),
        description: await getShortDescription(prpslRcrdId),
        example: await getCodeSample(prpslRcrdId),
        has_specification: await hasSpec(prpslRcrdId),
        presented: [presenceObjFrom(value)],
        title: await mdCodeSpans2html(getFullRefLinkContent(value.proposal, 0)),
        tests: hasOwn(value, 'tests') && isFullRefLink(value.tests) ?
            [getUrlFromDoc(getFullRefLinkContent(value.tests, 1))] : undefined,
    };
    return prpslRcrd;
});
Promise.allSettled(prpslRcrdPromiseArr).then(async (results) => {
    const data = [];
    results.forEach(result => {
        if (result.status === 'fulfilled')
            data.push(result.value);
        else
            throw new Error(result.reason);
    });
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const resultBuffer = json2yaml(dataBuffer, {});
    await fsp.writeFile(FILE_PROPOSAL_DATA, resultBuffer);
});
