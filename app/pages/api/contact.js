export default function handler(req, res) {
    if (req.method === 'POST') {
      // Extract data from the request body
      const { name, email, message } = req.body;
  
      // Process the contact form data (e.g., save to database)
      console.log(`Received contact form submission: ${name}, ${email}, ${message}`);
  
      // Respond with a success message
      res.status(200).json({ message: 'Contact form submitted successfully' });
    } else {
      // Handle any other HTTP method (e.g., GET, PUT, DELETE)
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }