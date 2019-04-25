# bc-data-table

[Demo](http://bc-data-table.s3-website-us-west-2.amazonaws.com)

It was deployed to an AWS S3 Bucket set as a static website host using the aws-cli. It uses Firebase's Firestore cloud as its database.

## Approach

This data table has the following functionalities:

- Order: click on the column header once to organize the data in ascending order, click twice to order it in descending order and click it a third time to go back to the original order.
- Filter/Search: If the `searchable` property is true for a column, a search field appears under the columns header where the user can quickly search for a specific data point.
- Edit: If the `edit` property is true for a column, one can click the edit button next to that column to edit its contents.

### props

1. data `(required)`: Array of data objects.
2. columns `(optional)`: Array of objects that describe the columns that should be displayed. If not passed to the component, every column in the data will be displayed. Example of columns array:

```json
[
  {
    "field": "Name",
    "label": "Name",
    "searchable": true
  },
  {
    "field": "Description",
    "label": "Description",
    "edit": true,
    "searchable": true
  },
  {
    "field": "Date",
    "label": "Date",
    "type": "date",
    "searchable": true
  }
]
```

- Pass the `type: "date"` in the object to tell the component this column is of type date (helps with comparison and it could be used to format it)
- Pass the boolean `edit` in the object to tell the component this column can be edited.
- Pass the boolean `searchable` in the object to tell the component this column can be filtered/searched.

### events

1. submit: the only event emitted by the component. It carries the edited data in the following format:

```json
{
  "index": 0,
  "field": "Description",
  "content": "dapibus ligula. Aliquam erat"
}
```

- `index` is the index from the data array, where the edited object is located
- `field` is the column edited by the user
- `content` is the new content for that field


## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run the end-to-end tests

```
npm run test:e2e
```

### Run the unit tests

```
npm run test:unit
```
