module.exports = {
  host: process.env.RDS_HOST || '34.222.46.246' || '172.31.25.171' || 'ip-172-31-25-171.us-west-2.compute.internal' || 'ec2-34-222-46-246.us-west-2.compute.amazonaws.com' || 'r-00516295df569210a',
  user: 'root',
  password: 'password',
  database: 'Customer_Reviews'
};