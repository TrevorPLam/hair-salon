# File Meta: docker-compose.yml

/\*\*

- @file docker-compose.yml
- @role infra
- @summary Local development Docker Compose definition for the web app.
-
- @entrypoints
- - docker-compose up (or docker compose up)
-
- @exports
- - N/A
-
- @depends_on
- - External: Docker Engine / Docker Compose
- - Internal: apps/web/Dockerfile
-
- @used_by
- - Local development workflows
-
- @runtime
- - environment: dev
- - side_effects: builds and runs web service on port 3000
-
- @data_flow
- - inputs: apps/web source code via volume mount
- - outputs: running Next.js container
-
- @invariants
- - Port mapping 3000:3000 expected for local access
-
- @gotchas
- - Volume mount can override container node_modules unless excluded
-
- @issues
- - [severity:low] None observed in-file.
-
- @opportunities
- - Add env_file support if .env.local is used
-
- @verification
- - Run: docker-compose up and confirm the app responds on http://localhost:3000
-
- @status
- - confidence: high
- - last_audited: 2026-02-09
    \*/

## Commentary

- This file is YAML; metaheader is stored here per project policy.
