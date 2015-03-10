# UI-Kitchen-Sink
UI-Documentation for the ILIAS-Open-Source Project

## Installation
1. Install npm by installing node.js from http://nodejs.org/ (root permission might be needed)
2. Install bower globally 'npm install -g bower' (root permission might be needed)
3. Install grunt globally 'npm install -g grunt-cli' (root permission might be needed)
4. Download the repository
5. Install npm modules: 'npm install' (installs the dependencies listed in package.json)
6. Install bower dependencies 'bower install' (installs the libs listed in bower.json into the directory from .bowerrc)
7. Create the index.html file and start a server by typing executing 'grunt' (executes the tasks from Gruntfile.js)
8. View in browser at http://localhost:8080

## Defining the content structure
Define the organization of your UI-Kitchen-Sink in 'app/data/categories.json' according to the following structure:
```javascript
{
  "categories": [{
      "title": "Title of first category",
      "id":"idOfFirstCategoryInLowerCamelCase",
      "subCategories": [
        {
          "title": "Title of first sub category",
          "id":"idOfFirstSubCategoryInLowerCamelCase",
          "itemGroups": [
            {
              "title": "Titel of first item group",
              "id":"idOfItemGroupInLowerCamelCase"
            },
            {
                ... (more item groups)
            },
          ]
        },
        {
            ... (more sub categories)
        }
      ]
    },
    {
        ... (more categories)
    }
  ]
}
```
2. Run 'grunt'
3. Folders and examples of the json file and html file for the first entry in each item group will be created automatically
4. Checkout 'http://localhost:8080' to see the changes made on the UI-Kitchen-Sink

Folder that are not listed anymore in 'app/data/categories.json' are no longer displayed in the UI-Kitchen-Sink. You can remove them by executing 'grunt buildEntries --deleteFolders=true'

## Adding entries
1. Create a someEntryName.html in the according folder (e.g.: 'app/data/someCategory/someSubCategory/someItemGroup/')
2. Run 'grunt' to automatically create the according json file.
3. Change to meta data in the json file.
4. Checkout 'http://localhost:8080' to see the changes made on the UI-Kitchen-Sink