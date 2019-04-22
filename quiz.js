// Assuming you have already done "npm install fernet"
let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABctPxmrRxiQ03pjYT09k4uPqKsBRXloHEqs5EzWok7_yXDqD6eQNNdgr7FDA7b_my4K8YToosIUxnRHgA_ttKYHFrOwm5YEEg2Eun30WxpQp_ndtwVObJocNnW0mcrehe-CGoD77d1VHA_4W787wOxQO64X6wtpJHYkreZ6U7JmYFfJjgdIpQS9H7mnPqoamCGkpVG'
let token = new Fernet.Token({secret: secret, token: message, ttl:0})
token.decode()
console.log(token.message)