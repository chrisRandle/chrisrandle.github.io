#!/bin/zsh

cd docs

bundle install

bundle exec jekyll serve --incremental

#open -a "Google Chrome" http://localhost:4000

