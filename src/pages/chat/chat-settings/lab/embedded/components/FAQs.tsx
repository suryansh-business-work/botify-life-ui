
import React from "react";
import { Box, Typography, Button, IconButton, TextField, Paper } from "@mui/material";
import { FieldArray, Formik, Form, getIn } from "formik";
import * as Yup from "yup";
import DeleteIcon from '@mui/icons-material/Delete';

const FAQSchema = Yup.object().shape({
  faqs: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answer: Yup.string().required("Answer is required")
    })
  )
});

const initialValues = {
  faqs: [
    { question: "", answer: "" }
  ]
};

const FAQs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Manage FAQs
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Add, edit, or remove frequently asked questions for your bot. These FAQs will help users get instant answers to common queries.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={FAQSchema}
        onSubmit={values => {
          // You can handle the save here (e.g., API call)
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <FieldArray name="faqs">
              {({ push, remove }) => (
                <>
                  {values.faqs.map((faq, idx) => {
                    const qErr = getIn(errors, `faqs[${idx}].question`);
                    const qTouch = getIn(touched, `faqs[${idx}].question`);
                    const aErr = getIn(errors, `faqs[${idx}].answer`);
                    const aTouch = getIn(touched, `faqs[${idx}].answer`);
                    return (
                      <Paper key={idx} sx={{ p: 2, mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start', background: '#f7f7fa' }}>
                        <Box flex={1}>
                          <TextField
                            label="Question"
                            name={`faqs[${idx}].question`}
                            value={faq.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!qErr && !!qTouch}
                            helperText={qTouch && qErr ? qErr : ''}
                            fullWidth
                            sx={{ mb: 1 }}
                          />
                          <TextField
                            label="Answer"
                            name={`faqs[${idx}].answer`}
                            value={faq.answer}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!aErr && !!aTouch}
                            helperText={aTouch && aErr ? aErr : ''}
                            fullWidth
                            multiline
                            minRows={2}
                          />
                        </Box>
                        <IconButton onClick={() => remove(idx)} disabled={values.faqs.length === 1} sx={{ mt: 1 }}>
                          <DeleteIcon />
                        </IconButton>
                      </Paper>
                    );
                  })}
                  <Button variant="outlined" onClick={() => push({ question: "", answer: "" })} sx={{ mb: 2 }}>
                    Add FAQ
                  </Button>
                  <Box>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      Save FAQs
                    </Button>
                  </Box>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FAQs;
