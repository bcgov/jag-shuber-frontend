# Frontend Devops Resources

## Structure

```
templates/
    frontend/
        frontend-build.json             // The Frontend builds to be added to tools project
        frontend-deploy.json            // Frontend deployment, to be added to application environments (dev, test, etc)
        frontend-deploy-prod.json       
    nginx-runtime/
        nginx-runtime-build.json        // nginx-runtime build to be added to tools
    yarn-builder/
        yarn-builder-build.json         // yarn-builder build to be added to tools
```

## Pipeline

### Policies

#### Dev
```
oc policy add-role-to-user system:image-puller system:serviceaccount:jag-shuber-dev:default -n jag-shuber-tools
oc policy add-role-to-user edit system:serviceaccount:jag-shuber-tools:jenkins -n jag-shuber-dev

```

#### Test
```
oc policy add-role-to-user system:image-puller system:serviceaccount:jag-shuber-test:default -n jag-shuber-tools
oc policy add-role-to-user edit system:serviceaccount:jag-shuber-tools:jenkins -n jag-shuber-test

```

#### Prod
```
oc policy add-role-to-user system:image-puller system:serviceaccount:jag-shuber-prod:default -n jag-shuber-tools
oc policy add-role-to-user edit system:serviceaccount:jag-shuber-tools:jenkins -n jag-shuber-prod

```




The `frontend-build.json` defines a build configuration for a *Jenkins Pipeline* which uses the (`jenkinsfile`)[../Jenkinsfile] in the root of the repository.  This file defines our declarative pipeline, currently this is how the pipeline is structured:

- Assemble Runtime and Builder images
- ⬇
- Build Application Artifacts
- Combine Artifacts with Runtime
- ⬇
- Tag the Image as `dev`
- Verify deployment in dev project
- Wait for approval ⏱
- ⬇
- Tag the Image as `test`
- Verify deployment in test project
- Wait for approval ⏱ to tag for prod
- ⬇
- Tag the Image as `prod`


# Background reading/Resources

[Free OpenShift book](https://www.openshift.com/promotions/for-developers.html) from RedHat – good overview

[Red Hat Container Development Kit](http://developers.redhat.com/products/cdk/overview/)

# OpenShift CI/CD pieline Demos:

- https://www.youtube.com/watch?v=65BnTLcDAJI
- https://www.youtube.com/watch?v=wSFyg6Etwx8
