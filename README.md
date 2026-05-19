# City Weather
### City Weather is a weather forecasting website using several APIs, styling libraries and React JS.

## Demo video
[![duno](./readmefiles//thumbnail.webp)](https://youtu.be/b0j_3zR0qlI)

## Concepts tested
- usage of multiple APIs
- css animations
- css modules for styling
- using graphs
- page transitions
- usage of search bars
- animated icons

# Sources used
[CSS Modules](https://github.com/css-modules/css-modules) <br /> 
[Select Component](https://react-select.com/home) <br /> 
[Framer library](https://www.framer.com/marketplace/components) <br /> 
[Chart.js](https://www.chartjs.org) <br /> 
[Chart.js label plug-in](https://chartjs-plugin-datalabels.netlify.app/guide) <br /> 
[Static weather icons](https://github.com/mrdarrengriffin/google-weather-icons) <br /> 
[Date library](https://date-fns.org) <br /> 
[Some features](https://www.hover.dev)


# APIs used
[Google Autocomplete API](ttps://developers.google.com/maps/documentation/places/web-service/legacy/autocomplete) <br /> 
[Visual Crossing API](https://www.visualcrossing.com/weather-api/) <br /> 
[Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) <br /> 
[Google Youtube API](https://developers.google.com/youtube/v3/getting-started) <br /> 

# Cleanup TODO (after the search-bar fix)

- **Remove unused dependencies** — these are in package.json but imported in zero src files: `@googlemaps/js-api-loader`, `@react-google-maps/api`, `@vis.gl/react-google-maps` (three Google-Maps libs; only `react-google-autocomplete` is actually used), and `dotenv` (a Vite frontend doesn't need it — Vite reads `.env` natively).
- **`date-fns` git submodule** — `.gitmodules` declares a `date-fns` submodule (a fork) but the code imports plain `date-fns` from npm (v4, named imports). The submodule is unused dead weight — remove it from `.gitmodules`.
- **Add a `.env.example`** — the project reads `VITE_GOOGLE_MAPS_API_KEY` and `VITE_VISUAL_CROSSING_API_KEY` but has no committed template; future clones have no idea what `.env` needs.
- **Known unfixed issues** — see "Issues not fixed" below (phone scaling).

# Issues not fixed
## Phone scaling
The website falls short of delivering satisfactory user experience. After dozens of attempts, its dimensions are way bigger than they should be, with white areas being accessible on vertical scroll. Another downfall is some features not working in smartphone dimensions, but they did work when being tested in Google DevTools and when browser was resized to phone dimentions. Better phone size testing tool is needed.

## Upcoming updates
### Version 1.1 Images zoom in
Feature: When double clicking / tapping on image, it should appear above all others in bigger dimensions, with an exit button on top right.

### Version 1.2 Phone App
Feature: After I learn how to make React Phone apps, this project should get its own phone app as I want to use it in daily life and provide it to my friends and family in the same way.
