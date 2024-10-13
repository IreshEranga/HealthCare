 <h1>FitPro - Fitness & Well-being App</h1>

 <p><strong>FitPro</strong> is a mobile application designed to help users maintain their physical and mental well-being. The app features four main components that focus on fitness tracking, mood tracking, nutrition, and personalized wellness plans. This project was developed by four team members as part of a university project, with a special emphasis on providing a comprehensive health management solution.</p>

 <h2>Nutrition Tracker Component</h2>
    <p>The Nutrition Tracker is a key feature of the app, developed by Shenori-Weerakoon. It helps users manage their dietary needs by providing tools for:</p>
    <ul>
      <li><strong>Calorie Calculator:</strong> Users can calculate the calories for food items and track their daily intake.</li>
      <li><strong>Set and Calculate Calorie Goals:</strong> Users can set personal calorie goals and calculate them based on factors like age, weight, height, and activity level.</li>
      <li><strong>Food Search and Logging:</strong> Users can search for food items, log them into their food diary, and track their nutritional intake.</li>
      <li><strong>Calorie Goal Tracking:</strong> Automatically calculates consumed calories as users add food items and compares them to their set goals.</li>
      <li><strong>Premium Meal Recipe Generator:</strong> Premium users can generate personalized meal plans based on dietary needs and goals.</li>
    </ul>
    <h2>Features</h2>
    <ul>
      <li><strong>Fitness Tracker:</strong> Track daily exercise, calories burned, and set fitness goals.</li>
      <li><strong>Mood Tracking & Journaling:</strong> Log daily moods and keep a journal for mental well-being.</li>
      <li><strong>Personalized Wellness Plans:</strong> Receive tailored fitness and wellness suggestions based on user input and goals.</li>
      <li><strong>Premium Features:</strong> Access exclusive meal recipes and advanced fitness tracking tools with a premium subscription.</li>
    </ul>
    <h2>Tech Stack</h2>
    <ul>
      <li><strong>Frontend:</strong> React Native (with Expo)</li>
      <li><strong>Backend:</strong> Node.js (Express)</li>
      <li><strong>Database:</strong> MongoDB</li>
      <li><strong>APIs:</strong> 
        <ul>
          <li>USDA Food Data Central Food search API</li>
          <li>Spoonacular API for recipe generation.</li>
        </ul>
      </li>
    </ul>
    <h2>Installation</h2>
    <ol>
      <li><strong>Clone the repository:</strong>
        <pre><code>git clone https://github.com/yourusername/fitpro-app.git</code></pre>
      </li>
      <li><strong>Navigate to the project directory:</strong>
        <pre><code>cd fitpro-app</code></pre>
      </li>
      <li><strong>Install dependencies:</strong>
        <p>In the root directory, run:</p>
        <pre><code>npm install</code></pre>
        <p>Navigate to the frontend folder and install client-side dependencies:</p>
        <pre><code>cd frontend
npm install</code></pre>
      </li>
      <li><strong>Configure environment variables:</strong>
        <p>Create a <code>.env</code> file in the root directory with the following keys:</p>
        <pre><code>API_KEY=your_edamam_api_key
SPOONACULAR_API_KEY=your_spoonacular_api_key
MONGODB_URI=your_mongodb_connection_string</code></pre>
        <p>Replace <code>your_edamam_api_key</code>, <code>your_spoonacular_api_key</code>, and <code>your_mongodb_connection_string</code> with actual credentials.</p>
      </li>
      <li><strong>Run the application:</strong>
        <p>In the backend root directory:</p>
        <pre><code>npm start</code></pre>
        <p>In the frontend directory, start the app:</p>
        <pre><code>npx expo start</code></pre>
      </li>
      <li><strong>Testing the app:</strong>
        <p>Scan the QR code with the Expo Go app on your phone to run the app.</p>
      </li>
    </ol>
    <h2>Premium Subscription</h2>
    <p>FitPro offers premium features, such as a meal recipe generator, accessible through subscription. Users with a premium account can enjoy curated meal plans based on their dietary preferences and fitness goals.</p>
    <h2>Contribution</h2>
    <ul>
      <li>Fork the repository.</li>
      <li>Create a new branch.</li>
      <li>Commit changes and create a pull request.</li>
    </ul>
    <h2>License</h2>
    <p>This project is licensed under the MIT License.</p>
    
