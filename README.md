## Details on Hiring task implementation

- **Frontend Framework:** In the job description, it was mentioned that the frontend should be in HTML, CSS, Javascript. I'm not sure, if it has to be in plain javascript or any framework like Reactjs. So, I've done both ways. You can test whatever matters.

  - _**With Vanilla javascript:**_ For vanilla javascript, you'll find a folder named as "frontend_currency_converter". To run it, just open the `index.html` file directly in the browser by clicking it. Please don't run with live server.
  - _**With React js:**_ For Reactjs frontend, I've implemented that in same frontend project (folder name is `frontend`) which we already had. I've created a seperate route `/currency-converter` and on that page, you'll find the currency converter up and running.

- **Bonus Task:** I've implemented the Bonus task as well to show all the History of currency conversions user has made. I'm storing the records in a `conversion_logs.json` file on backend. We've one endpoint which is returning all that logs to frontend to show the history.

- **Currency Conversion API:** I've used `fixer.io` API for currency convertion and currency symbols from `apilayers` platform. It has requests limit per day. Let me know if API doesn't respond at any point so I can provide you with new API key from another account.
