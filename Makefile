.PHONY: docker-image docker-container docker-build install build serve
docker-image:
	docker build --tag tc39/website:latest .

docker-container:
	docker create --tty --interactive \
		--name tc39-website \
		--volume ${PWD}:/tc39-website \
		--publish 8000:8000 \
		tc39/website

docker-build: docker-image docker-container

docker-clean:
	docker stop tc39-website || echo "Container not running"
	docker rm tc39-website || echo "Container does not exist"
	docker rmi tc39/website

install: docker-build
	docker start tc39-website
	docker exec -ti tc39-website bundle install
	docker stop tc39-website

build:
	docker start tc39-website
	docker exec -ti tc39-website jekyll build
	docker stop tc39-website

serve:
	docker start tc39-website
	docker exec -ti tc39-website jekyll serve --host 0.0.0.0 --port 8000 -w --force_polling
