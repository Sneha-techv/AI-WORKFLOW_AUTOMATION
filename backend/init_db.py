from database import engine, Base
import models

print("Creating all tables...")
Base.metadata.create_all(bind=engine)
print("Done!")