# QikServe test

This test was to build a responsive whitelabel restaurant app that has a config based on the venue.

# Installation

To run the project, you will need to install the dependencies first using `npm install`
No further steps shall be taken to set it up.

# Notes

Although the instructions were to use only the endpoint and not mock the data, I had to mock the data because I was having cors issues when calling that endpoint therfore not being able to actually retrieve the data from the API, I left the api call as I would do in a normal project there just for displaying it but I mocked the data in the code to allow the application to function without any problems, I also took the opportunity to update some of the mock items in the menu to test new interactions such as selecting other modifying options.
### Important: 
I would not make api calls directly in the useEffect hook, there's no problem with it but I would rather use `react-query` instead to handle these calls because of the caching and all the other functionalities that it gives you.

# Technologies

I chose to use Vite with the React + Typescript template, vite is really nice and fast, it has some awesome features plus a great testing tool called `vitest` that works very similarly to RTL and Jest.
Also for styling I chose Tailwind CSS because it's a great tool for styling when you have a good understanding of pure CSS and allows you to build UIs very quickly, one down side to it is that it's hard to integrate the dynamic styles that come from the venue API, it is possible to do it but it requires a lot more configuration to set it up which wasn't the focus of this project.
For global state management, as required, I used Redux because of its integration with React plus the Toolkit making it 1000x quicker and easier to set it up as well, easy to test, easy to use, great tool overall.

I used other tools for small things like lodash to achieve throttling in the search bar so that a repetitive action isn't made in every key stroke, I used react-i18n for translations, I used lucide-react for icons and I used the `Dialog` component from ShadcnUI/Radix to not waste a lot of time implementing a modal, it is already built for you with all of the key functionalities plus the styling is completely up to you giving you freedom to style it in whatever way you want.

# Things I would do

Of course I didn't implement everything I wanted because that is not the goal, but if I were to keep building this project, I would definitely add a redux-persist to persist the data between refreshes, I could have done it with localStorage but I chose not to because that's not how I would do it in a real life project while using redux, also, I didn't implement any date/time internationalization because there was no use for it in this application and if there were, I would have used `date-fns` most likely because it has so many cool features in it that give us a lot of ways to format dates and times in whichever way we want.

# Extras

I added a contact and login page just for fun and also to not leave the navbar with 2 options that had no interactions, I also added some animations of my own such as the chevron icon rotating when collapsed/expanded. The hamburger menu I built it to also add a nice animation to it.

# Overall

I had a lot of fun building this project, I hope you enjoy playing with it as much as I did building it.
