# How to configure a CI/CD pipeline for TFRS on OpenShift

We have created a [template](./templates/nginx-frontend-template.yml) yaml which describes the front end build environment.  It sets up the Jenkins instance, image streams and build configurations.

```
oc process -f openshift/templates/nginx-frontend-template.yml | oc create -f -
```

For now all this does is setup the Jenkins pods so that they can build our front end.

> This template was based on experimentation done using the [tfrs repo](https://github.com/bcgov/tfrs/tree/master/openshift/templates)

## Web UI
- Login to https://console.pathfinder.gov.bc.ca:8443; you'll be prompted for GitHub authorization.

## Command-line (```oc```) tools
- Download OpenShift [command line tools](https://github.com/openshift/origin/releases/download/v1.2.1/openshift-origin-client-tools-v1.2.1-5e723f6-mac.zip), unzip, and add ```oc``` to your PATH.  
- Copy command line login string from https://console.pathfinder.gov.bc.ca:8443/console/command-line.  It will look like ```oc login https://console.pathfinder.gov.bc.ca:8443 --token=xtyz123xtyz123xtyz123xtyz123```
- Paste the login string into a terminal session.  You are now authenticated against OpenShift and will be able to execute ```oc``` commands. ```oc -h``` provides a summary of available commands.



# Background reading/Resources

[Free OpenShift book](https://www.openshift.com/promotions/for-developers.html) from RedHat – good overview

[Red Hat Container Development Kit](http://developers.redhat.com/products/cdk/overview/)

# OpenShift CI/CD pieline Demos:

- https://www.youtube.com/watch?v=65BnTLcDAJI
- https://www.youtube.com/watch?v=wSFyg6Etwx8
