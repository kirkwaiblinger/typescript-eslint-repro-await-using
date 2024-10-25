# Demo of `await using` pitfalls

The purpose of this repro is to demo the myriad ways you can cause unhandled
rejections using `await using` on a sync `Disposable`, and which ones are and
aren't caught by dev tooling currently.

Play around with `yarn build`, `yarn start`, and the linter setup.
I tested this using node v20.18.0.
