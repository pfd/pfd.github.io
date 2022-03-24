serve:
	export JEKYLL_VERSION=3.8 && \
	docker run --rm \
		-p 4000:4000 \
		--volume="$$PWD:/srv/jekyll" \
		-it jekyll/jekyll:$$JEKYLL_VERSION \
		jekyll serve

build-production:
	export JEKYLL_VERSION=3.8 && \
	docker run --rm \
		--env JEKYLL_ENV=production \
		--volume="$$PWD:/srv/jekyll" \
		-it jekyll/jekyll:$$JEKYLL_VERSION \
		jekyll build

update-algolia:
	export JEKYLL_VERSION=3.8 && \
	docker run --rm \
		--env JEKYLL_ENV=production \
		--env ALGOLIA_API_KEY='529cc5624e1c800f855787d78436384b' \
		--volume="$$PWD:/srv/jekyll" \
		-it jekyll/jekyll:$$JEKYLL_VERSION \
		jekyll algolia
