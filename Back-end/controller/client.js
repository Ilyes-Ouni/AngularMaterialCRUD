const selectWhere = require('./Repository/selectWhere')
const connection = require('./config/database');
const insert = require('./Repository/insert');
const deleteWhere = require('./Repository/deleteWhere')
const updateWhere = require('./Repository/updateWhere')


exports.addClient = async(req, res) => {
    try {
        const { name, phoneNumber, email, address } = req.body
            // Creating queries
        connection.query(insert(`clients`, `(clientName, phoneNumber, email, createdOn, address)`, `(?, ?, ?, ?, ?)`), [name, phoneNumber, email, (new Date()).toISOString().split('T')[0], address], (err) => {
            if (err) throw err;
            res.json({ Result: "Success" })
        })
    } catch {
        res.status(400).json({ message: "Error Occured" })
    }
};

exports.getClients = async(req, res) => {
    try {
        connection.query(selectWhere('clients', '*', `deleted = 0`), (err, results) => {
            if (err) throw err
            if (!results[0]) {
                console.error(Output, " Client list is empty")
            } else {
                res.json({ Output: results })
            }
        })
    } catch (err) {
        res.status(400).json({ message: "Error Occured" })
    }
};

exports.deleteClient = async(req, res) => {
    try {
        const { clientID } = req.body
        connection.query(deleteWhere('clients', 'deleted = 1', `clientID=${clientID}`), (err, results) => {
            if (err) throw err
            res.json({ Output: results })
        });
    } catch {
        res.status(400).json({ message: "Error Occured" })
    }
}

exports.updateClient = async(req, res) => {
    try {
        const { name, phone, email, address, id } = req.body
        connection.query(updateWhere('clients', `clientName = '${name}',phoneNumber = ${phone},email = '${email}',address= '${address}' `, `clientID = ${id}`), (err) => {
            if (err) throw err
            res.json(`Client with ID: ${id} updated successfully`)
        });
    } catch {
        res.status(400).json({ message: "Error Occured" })
    }
};

exports.getClient = async(req, res) => {
    try {
        const { owner } = req.params

        connection.query(selectWhere('clients', `clientName, phoneNumber, email, address`, `clientID = ${owner}`), (err, results) => {
            if (err) throw err
            result = results[0].clientName + "/" + results[0].phoneNumber + "/" + results[0].address + "/" + results[0].email
            if (result)
                res.json(result)
        })
    } catch (err) {
        res.status(400)
    }
}