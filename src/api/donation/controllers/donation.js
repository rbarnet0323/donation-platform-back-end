'use strict';

/**
 *  donation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::donation.donation', ({ strapi }) => ({
  async create(ctx) {
    const {
      amount,
      user,
      token,
    } = ctx.request.body.data;
    try {
      await stripe.charges.create({
        amount: amount,
        currency: 'usd',
        description: 'donation',
        source: token,
      });
      const entity = await strapi.service('api::donation.donation').create({ amount, user });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      ctx.response.status = 500;
      return { error: { message: 'There was a problem processing the donation' } };
    }
  }
}));
