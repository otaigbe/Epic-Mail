const queries = {};

queries.selectAllMessages = 'SELECT * FROM messages where messagetype = $1';

export default queries;