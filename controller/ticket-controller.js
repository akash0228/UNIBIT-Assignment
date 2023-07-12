import ticketCollection from "../model/ticket.js";

export const generateTicket = async (req, res) => {
  try {
    const count = req.body.count;
    const tickets = [];

    for (let i = 0; i < count; i++) {
      const numbers = [];
      const availableNumbers =[
        [1,2,3,4,5,6,7,8,9],
        [10,11,12,13,14,15,16,17,18,19],
        [20,21,22,23,24,25,26,27,28,29],
        [30,31,32,33,34,35,36,37,38,39],
        [40,41,42,43,44,45,46,47,48,49],
        [50,51,52,53,54,55,56,57,58,59],
        [60,61,62,63,64,65,66,67,68,69],
        [70,71,72,73,74,75,76,77,78,79],
        [80,81,82,83,84,85,86,87,88,89,90]
      ];

      for (let row = 0; row < 3; row++) {
            numbers[row] = []; // Initialize the numbers array for each row

            for (let column = 0; column < 9; column++) {
            let start = column * 10 + 1;
            let end = start + 9;

                let number;
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * availableNumbers[column].length);
                    number = availableNumbers[column][randomIndex];
                } while (number < start || number >end);
                availableNumbers[column].splice(randomIndex, 1);
                numbers[row].push(number);
            }
        }
        tickets.push(numbers);
    }

    const newTicket = await ticketCollection.create({
      tickets:tickets
    });
    return res.status(200).json(newTicket._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getTickets = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const id = req.params.id;
  
      const skip = (page - 1) * limit;
  
      const totalTickets = await ticketCollection.countDocuments({ _id: id });
      const totalPages = Math.ceil(totalTickets / limit);

      const tickets = totalTickets<limit?await ticketCollection.find({ _id: id }):await ticketCollection.find({ _id: id })
        .skip(skip)
        .limit(limit);
  
      return res.status(200).json({
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalTickets,
        tickets: tickets
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
};  
