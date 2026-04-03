import { Controller, Get, Param, Headers, HttpException, HttpStatus } from '@nestjs/common';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

const MOCK_REVIEWS: Record<string, Review[]> = {
  default: [
    {
      author: 'FoodCritic42',
      rating: 4.8,
      text: 'Exceptional dining experience. The pasta was handmade and the wine selection is outstanding. Perfect for group dinners — the private dining room seats up to 12 comfortably.',
      date: '2026-03-15',
    },
    {
      author: 'DineWithMe',
      rating: 4.5,
      text: 'Great ambiance and friendly staff. The prix fixe menu is an excellent value for what you get. Reservations recommended for weekends.',
      date: '2026-03-10',
    },
    {
      author: 'LocalGourmand',
      rating: 4.9,
      text: "A hidden gem! The chef's tasting menu is a must-try. Each course was paired perfectly with wine. Service was impeccable and unhurried.",
      date: '2026-03-05',
    },
    {
      author: 'TeamDinnerPro',
      rating: 4.6,
      text: 'We booked for a team dinner of 8. The shared plates menu worked perfectly — everyone found something they loved. Reasonable prices for the quality.',
      date: '2026-02-28',
    },
  ],
};

@Controller('reviews')
export class ReviewsController {
  @Get(':restaurant')
  getReviews(
    @Param('restaurant') restaurant: string,
    @Headers('x-payment-proof') paymentProof: string | undefined,
    @Headers('x-payment-mandate') mandateHeader: string | undefined,
  ) {
    // If no payment proof → return 402
    if (!paymentProof) {
      throw new HttpException(
        {
          error: 'Payment Required',
          message: `Premium reviews for "${restaurant}" require payment`,
          x402Version: 1,
          accepts: [
            {
              scheme: 'exact',
              network: 'mock',
              maxAmountRequired: '50',
              currency: 'USD',
              description: 'Premium restaurant review access',
              payTo: 'mock-wallet-address',
            },
          ],
          headers: {
            'X-Payment-Required': 'true',
            'X-Payment-Amount': '0.50',
            'X-Payment-Currency': 'USD',
            'X-Payment-Address': 'mock-wallet-address',
            'X-Payment-Network': 'mock',
          },
        },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    // Validate payment proof (mock: just check it starts with "mock-proof-")
    if (!paymentProof.startsWith('mock-proof-')) {
      throw new HttpException(
        { error: 'Invalid payment proof', message: 'The payment proof provided is not valid' },
        HttpStatus.FORBIDDEN,
      );
    }

    // Milestone 5: Verify mandate if provided
    if (mandateHeader) {
      try {
        const mandate = JSON.parse(mandateHeader);
        const now = new Date();

        // Check mandate has required fields
        if (!mandate.id || !mandate.constraints?.maxAmount) {
          throw new HttpException(
            { error: 'Invalid mandate', message: 'Mandate is missing required fields (id, constraints.maxAmount)' },
            HttpStatus.FORBIDDEN,
          );
        }

        // Check expiry
        if (mandate.constraints?.validUntil && new Date(mandate.constraints.validUntil) < now) {
          throw new HttpException(
            { error: 'Mandate expired', message: `Mandate ${mandate.id} expired at ${mandate.constraints.validUntil}` },
            HttpStatus.FORBIDDEN,
          );
        }

        // Check amount — the premium review costs $0.50
        const cost = 0.50;
        if (mandate.constraints.maxAmount < cost) {
          throw new HttpException(
            { error: 'Mandate insufficient', message: `Mandate maxAmount (${mandate.constraints.maxAmount}) is less than cost ($${cost})` },
            HttpStatus.FORBIDDEN,
          );
        }
      } catch (err) {
        if (err instanceof HttpException) throw err;
        throw new HttpException(
          { error: 'Invalid mandate format', message: 'Could not parse X-Payment-Mandate header as JSON' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Payment verified — return premium reviews
    const reviews = MOCK_REVIEWS[restaurant] ?? MOCK_REVIEWS['default'];

    return {
      restaurant,
      reviewCount: reviews.length,
      averageRating: +(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
      reviews,
      paymentVerified: true,
      proofUsed: paymentProof,
    };
  }
}
