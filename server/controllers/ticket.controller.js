

module.exports.createTicket = async (req, res) => {
    const { backlog_id, ticket } = req.body;

    try {
        const newTicket = await Ticket.create({
            ...ticket,
            backlog_id
        });
        res.status(200).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const updatedTicketData = req.body;

    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            await ticket.update(updatedTicketData);
            res.status(200).json({ message: 'Ticket successfully updated.', data: ticket });
        } else {
            res.status(404).json({ message: 'Ticket not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            await ticket.destroy();
            res.status(200).json({ message: 'Ticket successfully deleted.' });
        } else {
            res.status(404).json({ message: 'Ticket not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
