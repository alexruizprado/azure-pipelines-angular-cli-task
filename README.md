# Angular CLI Task and Template for Azure Pipelines

The extension provides the basic tasks for building Angular applications using Angular CLI command line interface.

When creating a new build from scratch using the classic editor you will have the option to select the base template if desired, which will add some predefined steps using this extension and some others that may be required to build the application, like selecting the node version to use.
  ![Selecting the template from Classic Editor](https://raw.githubusercontent.com/alexruizprado/azure-pipelines-angular-cli-task/master/images/template_1.png)

Independent from the template you have the build step available to consume from any other existing build, where you can select some predefined commands like ng build, ng test, ng 2e2, etc, or a custom one with the desire arguments.

![Template applied](https://raw.githubusercontent.com/alexruizprado/azure-pipelines-angular-cli-task/master/images/template_2.png)

![Extra options](https://raw.githubusercontent.com/alexruizprado/azure-pipelines-angular-cli-task/master/images/template_3.png)

To use this taks in a YAML pipeline, you can alwyas go to the visual editor and copy or export the yaml code based on your selections. The base YAML structure for the step is as follow

```yaml
- task: AngularCLI@0
  displayName: ng custom
  inputs:
    command: custom
    project: SomeAngularProjectRootFolder
    custom: e2e
    verbose: true
    debug: false
```
For a full YAML template sample file, look at [pipeline.yaml](pipeline.yaml) in this repo.

### Contributing
If you like the extension and have some feedback, recommendations or issues to report, please do so on the Github repo. Pull requests are always welcome!
