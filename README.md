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


or you can use [requests.http](https://github.com/soltanireza65/arsonex-challenge/blob/main/requests.http)

## Database
- postgresql

## Generate migrations
```bash
pnpm run typeorm migration:generate migrations/<migration_name> -d typeOrm.config.ts
```

## Test

```bash
make test
```

or 

```bash
pnpm test
```


## Ci/CD
- gitlab-ci
- obviously its not working now:
- required tools:
  - kubectl
  - kubernetes cluster
  - gitlab-ci (move repo to gitlab)
  - ci base image with kubeConfig initialized
  

## Todo
- proper response codes
- proper error handling

## Notes
- walletService has hardCoded userIds 1 and 2