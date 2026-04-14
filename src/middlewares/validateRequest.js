export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });

        if (!result.success) {
            const message = result.error.issues
                .map((e) => e.message)
                .join(', ');
            return res.status(400).json({ message });
        }
      
          // Only replace if they exist in the parsed result
          if (result.data.body) req.body = result.data.body;
          if (result.data.params) req.params = result.data.params;
          if (result.data.query) req.query = result.data.query;

        next();
    };
};