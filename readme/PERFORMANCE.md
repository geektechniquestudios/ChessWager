### Performance

###### These benchmark results are from Google's [Lighthouse](https://developers.google.com/web/tools/lighthouse) auditing tool.

![](readme-assets/lighthouse1.png)

- Users can consistently expect payout within 5 seconds of a game ending.
- Database load times are ususally between 50-100ms.
- Less than 25MB of the client's system memory is used under peak loads.

![](readme-assets/lighthouse2.png)

###### Lighthouse warns "There may be stored data affecting loading performance in this location: IndexedDB". There seems to be no way to test this app without getting that warning, even in a private tab.

###### Lighthouse warns "The page loaded too slowly to finish within the time limit. Results may be incomplete". This is because the continuous data stream from lichess stays open.