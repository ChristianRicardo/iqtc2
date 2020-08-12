'use strict';  
const stripe = require('stripe')('sk_test_2XkRYBMa0WPXNiEZ043QDflQ00klhIfM42');

module.exports = {  
  create: async ctx => {
    const {
      quantidade,
      cursos,
      token
    } = ctx.request.body;

    // Charge the customer
    try {
      await stripe.charges.create({
        // Transform cents to dollars.
        amount: quantidade * 100,
        currency: 'usd',
        description: `Compra ${new Date()} by ${ctx.state.user.id}`,
        source: token,
      });

      // Register the order in the database
      try {
        const compras = await strapi.services.order.create({
          user: ctx.state.user.id,
          quantidade,
          cursos,
          city,
        });

        return compras;
      } catch (err) {
        // Silent
      }
    } catch (err) {
      // Silent
    }
  },
};