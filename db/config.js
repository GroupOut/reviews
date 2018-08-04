module.exports = {
  host: process.env.RDS_HOST || 'ec2-34-222-46-246.us-west-2.compute.amazonaws.com',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'Customer_Reviews'
};