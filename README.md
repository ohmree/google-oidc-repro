## Usage

```shellsession
$ sudo systemctl start docker # or the equivalent for your system, if it's not running already.
$ pnpm i
$ pnpm db:start
$ pnpm db:migrate
$ pnpm dev
$ cp .env{.example,} && $EDITOR .env # fill out with a google client ID
$ firefox http://localhost:3000/auth/login # replace with your favorite browser.
$ xh get localhost:3000 --auth-type=bearer --auth="..." # use your favorite http client, replace `...` with the token received in the previous step.
```
