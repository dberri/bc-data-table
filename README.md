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
  index,
  field,
  content
}
```

- `index` is the index from the data array, where the edited object is located
- `field` is the column edited by the user
- `content` is the new content for that field

## Q&A

### How long did you spend on the test? Would you do anything differently if you had more time?

I spent about 6 hours developing this component. It breaks down to approximatelly 1 hour for the basic setup (Firebase database and initial Vue setup), 1 hour for the ordering functionality, 1 hour for the filtering/search functionality, 1 hour for description editing, 30 minutes working on responsiveness and 1.5 hours for testing.

If I had more time, I would at least implement pagination or infinite loading (or both :D) which is very important, especially when working with many rows.
I would also let the user choose the Date format.
It would also be helpful to tell the component which columns should be ordered by default.

### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

The component could be adapted to be styled by the user (through props and such) and just let it be used because for its functionality across different designs.

### What CSS property did you recently learn about that helped you on a project?

Flexbox. I learned it a while ago, but it still is the one thing that made the biggest impact on my workflow. Now, I am much more productive on my projects.

### What is your favorite modern Javascript feature? Why?

It's both Arrow functions and Async/Await. They make the code more elegant and easier to read. Also, in the case of arrow functions, they don't create their own context, making the use of the `this` keyword more manageable.

### What is your favorite third-party Vue.js library? Why?

- [vue-cal](https://github.com/antoniandre/vue-cal). Because it was the first open-source project I contributed to 💙

The `quiz.js` and `description.json` files are in the root directory of the project.

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
