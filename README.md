![Intrinsic Value Calculator - 11 May 2022](https://user-images.githubusercontent.com/56531743/167886990-fbee3cfc-7152-44b0-929e-10b0ffc21798.gif)


# Intrisic Value Calculator Web-App
Intrinsic Value Calculator is a free Webapp, designed for retail investors, who want to do quick and professional discounted cash flow analysis on public US companies.

## Coms with Backend
This App uses Apollo client to communicate to the backend with Graph QL. The backend contains a store of all fundamental stock data from all NASDAQ and NYSE companies since their inception. All significant data filtering is done on the backend to save on Comms bandwidth and improve Web-App speed.  

## Installation
You’ll need to have Node 10.16.0 or later version on your local development machine (but it’s not required on the server). I recommend using the latest LTS version.

To create a new app:

## npx
Use the following command

```
git clone https://github.com/lcoops-93/value-investor-saas.git
npm start
```

