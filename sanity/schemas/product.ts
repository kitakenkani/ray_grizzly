export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name of Product',
        },
        {
            name: 'images',
            type: 'array',
            title: 'Product Images',
            of: [{type: 'image'}],
        },
        {
            name:'description',
            type: 'text',
            title: 'Description of product',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Product Slug',
            options: {
                source: 'name',
            },
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'price_id',
            title: 'Stripe Price ID',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Product Category',
            type: 'reference',
            to: [
                {
                    type: 'category',
                },
            ],
        },
        {
            name: 'available',
            title: 'Available (In Stock)',
            type: 'boolean',
            description: 'Uncheck when the item is sold.',
            initialValue: true,
        },
        {
            name: 'order',
            title: 'Order Info',
            type: 'object',
            readOnly: true,
            fields: [
                { name: 'buyerName', type: 'string', title: 'Buyer Name' },
                { name: 'email', type: 'string', title: 'Email' },
                { name: 'addressLine1', type: 'string', title: 'Address' },
                { name: 'addressLine2', type: 'string', title: 'Address 2' },
                { name: 'city', type: 'string', title: 'City' },
                { name: 'state', type: 'string', title: 'State / Prefecture' },
                { name: 'postalCode', type: 'string', title: 'Postal Code' },
                { name: 'country', type: 'string', title: 'Country' },
                { name: 'purchasedAt', type: 'datetime', title: 'Purchased At' },
            ],
        },
    ],
}
