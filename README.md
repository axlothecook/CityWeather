# City Weather
### A weather forecasting website using several APIs, styling libraries and React JS.

## Demo video
[![demo video](./readmefiles//thumbnail.webp)](https://youtu.be/b0j_3zR0qlI)

## Concepts tested
- usage of multiple APIs
- css animations
- css modules for styling
- using graphs
- page transitions
- usage of search bars
- animated icons

## Features
<ul>
  <li>search any city, with Google Autocomplete  suggesting names as the user types</li>
  <li>weather forecast for the searched cityfrom the Visual Crossing API, shown with charts</li>
  <li>photo gallery of the city, pulled from Google Places</li>
  <li>tour videos of the city captured during a walk, found through the YouTube API within 30 miles of it</li>
  <li>horizontal four-slide layout with page transitions, css animations and animated weather icons</li>
  <li>loading and error screens while the data arrives</li>
</ul>

## How it works
The graph below shows where the data comes from. The search gives the city's coordinates, and those coordinates fan out to three APIs: Visual Crossing for the weather, Google Places for the photos and YouTube for the videos. Everything then renders into the four slides.

![image](https://github.com/user-attachments/assets/a7b119f3-0bf8-4ab0-8de8-a3d9d893dc9e)

## Sources used
[CSS Modules](https://github.com/css-modules/css-modules) <br /> 
[Select Component](https://react-select.com/home) <br /> 
[Framer library](https://www.framer.com/marketplace/components) <br /> 
[Chart.js](https://www.chartjs.org) <br /> 
[Chart.js label plug-in](https://chartjs-plugin-datalabels.netlify.app/guide) <br /> 
[Static weather icons](https://github.com/mrdarrengriffin/google-weather-icons) <br /> 
[Date library](https://date-fns.org) <br /> 
[Some features](https://www.hover.dev)


## APIs used
[Google Autocomplete API](https://developers.google.com/maps/documentation/places/web-service/legacy/autocomplete) <br /> 
[Visual Crossing API](https://www.visualcrossing.com/weather-api/) <br /> 
[Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) <br /> 
[Google Youtube API](https://developers.google.com/youtube/v3/getting-started) <br /> 
