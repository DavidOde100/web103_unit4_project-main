# WEB103 Project 4 - *DriveCraft*

Submitted by: **David Odejimi**

About this web app: **DriveCraft is a full-stack custom car configurator where users can build and save personalized cars by selecting options like exterior color, roof style, wheels, and interior. The app provides a live visual preview with 3D-inspired styling, dynamically updates total price based on selected features, prevents invalid feature combinations, and supports full CRUD actions (create, view, edit, and delete) for saved builds using a React frontend, Express API, and PostgreSQL database.**

Time spent: **2.5** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [X] **The web app uses React to display data from the API.**
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [X]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [X]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [X] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [X] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [X] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [X] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [X] **The visual interface changes in response to at least one customizable feature.**
- [X] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [X] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [X] **Users can view a list of all submitted `CustomItem`s.**
- [X] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [X] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [X] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [X] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One of the biggest challenges was keeping the frontend state, pricing logic, and backend validation consistent while users changed options quickly in the customizer. I also had to debug several UI/UX issues, including selection timing behavior, layout clipping on the View Cars page, and making the car preview look more realistic without breaking responsiveness. On the backend side, configuring PostgreSQL connectivity and keeping CRUD flows stable across create/edit/detail/list pages required careful testing. A key takeaway from this project was the importance of validating both data rules and visual behavior together, especially in interactive configurator-style apps.

## License

Copyright [2026] [David Odejimi]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0