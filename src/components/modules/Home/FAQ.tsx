import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about ordering delicious meals from
            FoodHub.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is FoodHub?</AccordionTrigger>
              <AccordionContent>
                FoodHub is a modern food delivery platform offering fresh,
                high-quality meals from top-rated restaurants.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I place an order?</AccordionTrigger>
              <AccordionContent>
                Browse our menu, select your favorite dishes, add them to your
                cart, and proceed to checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>
                We accept credit cards, debit cards, mobile banking, and cash on
                delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I track my order?</AccordionTrigger>
              <AccordionContent>
                Yes, once your order is confirmed, you can track it in real time
                from your dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Column 2 */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-5">
              <AccordionTrigger>How long does delivery take?</AccordionTrigger>
              <AccordionContent>
                Delivery typically takes between 30–45 minutes depending on your
                location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Can I cancel my order?</AccordionTrigger>
              <AccordionContent>
                Orders can be canceled within 5 minutes of placing them before
                preparation begins.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Do you offer discounts?</AccordionTrigger>
              <AccordionContent>
                Yes! We regularly offer discounts, promo codes, and seasonal
                deals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>Is my payment secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We use secure encryption technology to ensure all
                transactions are safe and protected.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
