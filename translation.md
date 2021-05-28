# Translation Guidelines

The translation of the TC39 web page aims to make the work of TC39 more accessible to people whose
native language may not be english. For this, we are working with the community to get basic
information about upcoming language features into their language.

## Adding a translation of a feature

To translate a feature, edit the [stage 3 file](_data/en/stage3.yml) for that language. If a
description field is empty, that proposal needs a translation. Once you finish the translation(s),
you can open a pull request and ping a reviewer who can ok your translation.

## Adding support for a new language

To add a new language, you will need to create a couple of files. A good way to get started is to
clone the [english language directory](_data/en) or any other language to start with. Name the folder using the [Unicode BCP 47](https://www.unicode.org/reports/tr35/tr35.html#Canonical_Unicode_Locale_Identifiers) locale identifiers. We currently prefer language only identifiers, but can expand to regions as necessary.

Once you have created your folder, you will want to translate all text into your language. You will
also want to copy this readme file and translate it, so others can help you.

With that finished, add your language to the [language list](https://github.com/tc39/tc39.github.io/blob/master/_config.yml#L21) and [language file](_data/languages.yml) of the site. You will need a reviewer to proof read your translations, and request a review from @codehag to make sure everything looks right.

## Active reviewers

To land your changes, you can request reviews from the following active reviewers:

### For New Languages:

- @codehag

### German transation:

- ...

See the [German Translation documentation](translation_de.md) for more info.

### Japanese Translation:

- ...

See the [Japanese Translation documentation](translation_ja.md) for more info.

### Russian Translation:

- ...

See the [Russian Translation documentation](translation_ru.md) for more info.

### Traditional Chinese Translation:

- ...

See the [Traditional Chinese Translation documentation](translation_zh-Hans.md) for more info.
