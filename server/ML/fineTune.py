from datasets import load_dataset
from transformers import BartForConditionalGeneration, BartTokenizer, Trainer, TrainingArguments, EarlyStoppingCallback
import evaluate  # Use evaluate for metrics

# Load the BART model and tokenizer
model_name = "sshleifer/distilbart-cnn-12-6"  # Define the name of the pre-trained BART model for summarization.
model = BartForConditionalGeneration.from_pretrained(model_name)  # Load the pre-trained BART model (used for conditional generation).
tokenizer = BartTokenizer.from_pretrained(model_name)  # Load the corresponding tokenizer for BART.

# Load your dataset (you can replace this with your own dataset)
dataset = load_dataset("ccdv/govreport-summarization")
# Ensure that the dataset is split into train and validation sets correctly
train_dataset = dataset["train"].select(range(250))  # Only use the first 1000 examples for training
val_dataset = dataset["test"].select(range(250))  # Use a small subset of the test data for validation

# Preprocess the data: Tokenizing the inputs and outputs
def preprocess_function(examples):
    inputs = examples["report"]  # Get the article text from the dataset.
    targets = examples["summary"]  # Get the highlights (summaries) from the dataset.

    # Tokenize input and target text
    model_inputs = tokenizer(inputs, max_length=512, truncation=True, padding="max_length")
    with tokenizer.as_target_tokenizer():  # Switch tokenizer to target (summary) tokenizer
        labels = tokenizer(targets, max_length=200, truncation=True, padding="max_length")  # Tokenize the highlights with max length of 200 tokens.
    
    # Return the processed inputs and labels (model inputs and corresponding labels)
    model_inputs["labels"] = labels["input_ids"]  # Set the model's labels to the tokenized summary texts.
    return model_inputs  # Return the processed tokenized inputs and labels.

# Apply the preprocessing function to the dataset
tokenized_train = train_dataset.map(preprocess_function, batched=True)  # Apply the preprocess_function to each example in the training dataset
tokenized_val = val_dataset.map(preprocess_function, batched=True)  # Apply the preprocess_function to each example in the validation dataset

# Define the metric for evaluation (ROUGE score for summarization tasks)
metric = evaluate.load("rouge")

# Function to compute the evaluation metric
def compute_metrics(p):
    predictions, labels = p
    decoded_preds = tokenizer.batch_decode(predictions, skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    # Compute ROUGE score
    result = metric.compute(predictions=decoded_preds, references=decoded_labels)
    return result

# Set up training arguments
training_args = TrainingArguments(
    output_dir="./results",  # Output directory to save the model
    evaluation_strategy="epoch",  # Evaluate the model every epoch
    learning_rate=2e-5,  # Learning rate
    per_device_train_batch_size=1,  # Batch size for training
    per_device_eval_batch_size=1,  # Batch size for evaluation
    weight_decay=0.01,  # Weight decay for regularization
    num_train_epochs=3,  # Number of training epochs
    save_strategy="epoch",  # Save the model at the end of each epoch
    logging_dir="./logs",  # Directory to store logs
    load_best_model_at_end=True,  # Load the best model when finished training
    gradient_accumulation_steps=4,
    save_steps=1000,  # Save the model every 1000 steps
    save_total_limit=3,
)

# Initialize the Trainer with EarlyStoppingCallback
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_train,  # Training dataset
    eval_dataset=tokenized_val,  # Validation dataset
    compute_metrics=compute_metrics,  # Evaluation metric
    callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],  # Stop after 2 epochs of no improvement
)

try:
    trainer.train()
except KeyboardInterrupt:
    print("Training manually stopped. Saving model...")
    model.save_pretrained("./fine_tuned_bart")
    tokenizer.save_pretrained("./fine_tuned_bart")
