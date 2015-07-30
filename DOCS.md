# Docs

A place for random tidbits about banknote.

## Model Breakdown

  * `StatementCollection`
 
    A collection of Statement's. Used to represent a grouping of data such as the yearly summary of income by source per month.


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
