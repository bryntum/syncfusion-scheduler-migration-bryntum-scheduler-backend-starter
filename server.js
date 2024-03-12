import cors from "cors";
import express from "express";
import { db } from "./utils/dbConnect.js";

const app = express();


const port = process.env.PORT || 1338;
app.use(express.json());

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Started on localhost: ${port}`);
});

app.post("/api/getEventsData", async (req, res) => {
  try {
    const [appointments] = await db.query("SELECT * FROM appointments");
    res.send(appointments);
  } catch (error) {
    console.error({ error });
    res.status(500).send({
      success: false,
      message: "There was an error loading the appointments data.",
    });
  }
});

app.post("/api/getResourcesData", async (req, res) => {
  try {
    const [resources] = await db.query("SELECT * FROM resources");
    res.send(resources);
  } catch (error) {
    console.error({ error });
    res.status(500).send({
      success: false,
      message: "There was an error loading the resources data.",
    });
  }
});

app.post("/api/batchEventsData", async (req, res) => {
  try {
    if (req.body.changed != null && req.body.changed.length > 0) {
      const changed = req.body.changed;
      Promise.all(
        changed.map(({ Id, Guid, StartTime, EndTime, ResourceId, ...data }) => {
          const resourceIdValue = Array.isArray(ResourceId)
            ? ResourceId
            : [ResourceId];
          return db.query("UPDATE ?? set ? where Id = ?", [
            "appointments",
            {
              ...data,
              StartTime: new Date(StartTime),
              EndTime: new Date(EndTime),
              ResourceId: JSON.stringify(resourceIdValue), // Use the JSON string
            },
            Id,
          ]);
        })
      );
    }
    if (req.body.added != null && req.body.added.length > 0) {
      const added = req.body.added;
      Promise.all(
        added.map(({ Guid, StartTime, EndTime, ResourceId, ...data }) => {
          const resourceIdValue = Array.isArray(ResourceId)
            ? ResourceId
            : [ResourceId];
          return db.query("INSERT INTO ?? set ?", [
            "appointments",
            {
              ...data,
              StartTime: new Date(StartTime),
              EndTime: new Date(EndTime),
              ResourceId: JSON.stringify(resourceIdValue), // Use the JSON string
            },
          ]);
        })
      );
    }
    if (req.body.deleted != null && req.body.deleted.length > 0) {
      const deleted = req.body.deleted;
      await db.query(
        `DELETE FROM appointments WHERE id in (?)`,
        deleted.map(({ Id }) => Id)
      );
    }
    res.json({
      result: {
        changedRecords: req.body.changed,
        addedRecords: req.body.added,
        deletedRecords: req.body.deleted,
      },
    });
  } catch (error) {
    console.error({ error });
    res.status(500).send({
      success: false,
      message: "There was an error loading the resources data.",
    });
  }
});