## Understanding Data Streams: Keeping Web and App Data Separate

### Overview

Imagine you have a favorite website you visit both on your computer and through an app on your phone. Even though you're accessing the same content, the way you interact with it might be different based on whether you're clicking with a mouse or tapping on a screen. It's essential for the people who run the website to understand these differences to improve your experience. This is where the concept of data streams comes into play, ensuring that the information from the website and the app is kept separate and clear.

### Why Separate Data Streams?

Separating data streams helps us understand how users interact with our content differently on the website versus the app. By doing this, we can:

- **Improve User Experience**: Tailor features and content specifically for app users or website visitors.
- **Track Performance Accurately**: Understand which platform is performing better and why.
- **Make Informed Decisions**: Use the separate data to make changes and improvements where they are most needed.

### How We Do It: Methodology Explained

Our project uses a simple yet effective method to tell apart the data coming from the app and the website. Here's a friendly breakdown:

1. **The 'app_source' Tag**: Think of 'app_source' as a label. When someone visits our website through the app, this label is attached to the information we gather, telling us, "Hey, this data came from the app!"

   - For example, if you open the website in the app, the address might look something like this: `http://localhost:4200/?app_source=app`. This is our way of labeling data from the app.
   - Conversely, if you visit the website directly, it looks like this: `http://localhost:4200/`. This tells us the data is coming from the web.

2. **Google Tag Manager (GTM)**: We use a tool called Google Tag Manager to manage these labels effectively. It helps us recognize whether the 'app_source' label is present and then organizes the data accordingly.

3. **Checking the Data**: We have ways to double-check if the labeling is working correctly, ensuring that the data streams remain separate and accurate.

### In Conclusion

By differentiating the data streams, we ensure that the insights we gain are accurate and reflective of how users interact with our content across different platforms. This process is crucial for providing a tailored and enjoyable experience, whether you're browsing on your phone or clicking away on your computer.
