# user-table-exercise
Front End Exercise for Interview Candidates

##What I Did

- The first thing that I did was rip out the existing <table> implementation and replace it with a really nice react table 
(react-table). I've used this before and it's very clean.  It allows paging, sorting, searching, 
has a loading feature, and looks much nicer out of the box.

```yarn add react-table```
- Added paging and loading functionality. I originally used the filtering capabilites of react-table as well, but was having
issues with being able to type into the filter column even when it was disabled (very annoying) and replicates the original
bug mentioned in the exercise.
- To fix the bug in the exercise, I ended up having a filter input with a button to trigger the server-side action. 
- Added a nicer icon and name to the tab
- Added dialog box with retry button after 500 error

## What I Didn't Do
- It might have been nice to have a filter on the e-mail as well. Just wanted to keep it simple
- Along the lines of simplicity, I just used the react-table styling and didn't try to do anything 
fancy.
- I forced the number of items per page to 5 to keep it simple.
- I've used a throttler in the past to reduce the amount of chatter when doing the search. This 
  enforces a fixed amount of non-typing time before the axios call is made, allowing multiple characters
  to be typed for one call
- Add a refresh button on the screen that directly calls updateData without requiring a page refresh
- I couldn't implement sorting because it wasn't supported by the json_server

## What I Did But Shouldn't Have
- If I was writing the service, I would have made it fully support a Pagable paradigm. But I wanted
to keep with the json-server, which doesn't really support that. At a minimum, the react-table needs to know how many total pages there are so it can properly 
manage the paging portion of the table. I could have done this manually, or could have probably used
a different mode of the table, but for simplicity, I just hard-coded the number of total entries
so I could determine the total number of pages for any given page size. This breaks when you filter. There are numerous
ways to fix this, but I just left it as is for now
- I noticed later on that I wasn't supposed to pull any additional packages into the project. I was already committed at this point,
so I'm leaving it as is. I can re-do it if necessary (that's what I get for working at 10 at night!)

## What is wrong with the search function
The problem with the existing search function was that
it didn't lock out the search field while the async function was running. Since the results were asynchronous, and since there
was a variable timeout, multiple searches could be running at the same time, and with the variable timeout older search results 
could have been returned after new ones. This is a bit annoying because you have to wait for every result before you can type the next 
character. A solution that I like is to use a "throttled" function that will only call the async function if no keyboard entry is
detected for a certain amount of time (500ms works well). If you keep typing, the timeout keeps getting reset (see what I didn't do above).
What I ended up doing was to lock the update using a button that is disabled as soon as it is pressed, and only re-enabled after
the async function returns.