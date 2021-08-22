const { Gig } = require("../models");

const gigs = async (_, { filters }) => {
  const gigs = await Gig.find({ accepting: true })
    .populate("genre")
    .populate("venue");

  if (filters) {
    const filteredGigs = gigs.filter((gig) => {
      const filteredPerformers = gig.performers.filter((performers) => {
        if (filters.musician) {
          return filters.musician === performers.musician;
        } else if (filters.band) {
          return filters.band === performers.band;
        }
      });

      return filteredPerformers.length;
    });

    return filteredGigs;
  }

  return gigs;
};

module.exports = gigs;