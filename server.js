app.get('/api/schedule/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const query = `
        SELECT Id, GroupId, DayOfWeek, Time, Subject, LastUpdated
        FROM Schedule
        WHERE GroupId = ?
        ORDER BY DayOfWeek, Time
    `;
    
    db.query(query, [groupId], (err, results) => {
        if (err) {
            console.error('Error fetching schedule:', err);
            res.status(500).json({ error: 'Failed to fetch schedule' });
            return;
        }
        res.json(results);
    });
}); 