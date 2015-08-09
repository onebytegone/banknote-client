# Docs

A place for random tidbits about banknote.

## Model Breakdown

  * `StatementCollection`
 
    A collection of Statement's. Used to represent a grouping of data such as the yearly summary of income by source per month.

    A `StatementCollection` is used for representing a set of +1 dimensional data. `Statement` adds this additional dimension of information.


  * `Statement`
    
    A container for AmountEntryCollection. This adds extra data regarding the collection. May be used to store data about what is in an account over the period of a year.

    * Tag
    * `AmountEntryCollection`


  * `AmountEntryCollection`
  
    A collection of AmountEntry's. This also adds subcollection creation and summation of AmountEntry's.


  * `AmountEntry`
    
    This stores the data for a single transaction. A transaction range from a single income event to a total for a month of expenses.

    * `MoneyStack`
    * Date
    * Category _(optional)_
    * Name _(optional)_


## Proposed Data Storage Options

This are some possible options for persisting the app data.

### Local storage

   + can load data automatically on page load
   + easy to use
   - not shared between devices
   - can be reset at any time
   - can't be backed up by user easily
   - no versioning


### Local file that is imported

   + can be backed up and placed in version control by user
   + can be sync with Dropbox
   + user can encrypt if desired
   ? how importing would work
   ? how would do on mobile


### Store data on Dropbox

   + auto syncing for user
   + some versioning by Dropbox
   - requires Dropbox account
   - adds complexity to app
   - user cannot encrypt file, would have to be handled by app
