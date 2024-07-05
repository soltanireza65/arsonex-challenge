## Required tools
- docker
- docker-compose
- make (optional)
- pnpm

## Developement

```bash
make dev
```

or

```bash
docker-compose up --build
```


## http endpoints


or you can use [requests.http](https://github.com/soltanireza65/daal-challenge/blob/main/requests.http)

## Database
- postgresql

## Test

```bash
make test
```

or 

```bash
pnpm test
```

## Todo
- proper response codes
- proper error handling

## Notes
- walletService has hardCoded userIds 1 and 2