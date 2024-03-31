// Import Farcaster Social Graph library
import { FarcasterSocialGraph } from '@farcaster/social-graph';

// Initialize Farcaster Social Graph client
const socialGraph = new FarcasterSocialGraph({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
});

// Authenticate user (OAuth flow)
socialGraph.authenticate().then((accessToken) => {
  // Use the access token to make API requests
  socialGraph.getUserProfile().then((profile) => {
    console.log('User Profile:', profile);
  }).catch((error) => {
    console.error('Error fetching user profile:', error);
  });
}).catch((error) => {
  console.error('Authentication error:', error);
});
