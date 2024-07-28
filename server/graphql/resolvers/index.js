const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const User = require("../../model/user");
const Slider = require("../../model/slider");
const Event = require("../../model/event");

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw err;
      }
    },

    sliders: async () => {
      try {
        const sliders = await Slider.find();
        return sliders;
      } catch (err) {
        throw err;
      }
    },
    slider: async (parent, { sliderId }) => {
      try {
        const slider = await Slider.findById({ _id: sliderId });
        return slider;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const newFileName = uuidv4() + filename;
      const pathName = path.join(
        path.dirname(path.dirname(__dirname)),
        `/public/images/${newFileName}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      const newUser = new User({
        file: newFileName,
      });
      const result = await newUser.save();
      return {
        url: `http://localhost:5000/images/${newFileName}`,
        _id: result._id,
      };
    },
    updateFile: async (parent, args) => {
      const { file, fileId } = args.updateInput;
      try {
        const user = await User.findById({ _id: fileId });
        if (user) {
          const { createReadStream, filename, mimetype, encoding } = await file;
          const stream = createReadStream();
          const newFileName = uuidv4() + filename;
          const pathName = path.join(
            path.dirname(path.dirname(__dirname)),
            `/public/images/${newFileName}`
          );
          await stream.pipe(fs.createWriteStream(pathName));
          if (filename) {
            fs.unlink(
              path.join(
                path.dirname(path.dirname(__dirname)),
                `/public/images/${user.file}`
              ),
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
          const newUser = {
            file: newFileName,
          };
          await User.findOneAndUpdate({ _id: fileId }, newUser, { new: true });
          return {
            url: `http://localhost:5000/images/${newFileName}`,
            _id: user._id,
          };
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw err;
      }
    },

    createSlider: async (parent, { files }) => {
      let images = [];
      let urls = [];
      for (let i = 0; i < files.length; i++) {
        const { createReadStream, filename, mimetype, encoding } = await files[
          i
        ];
        const stream = createReadStream();
        const newFileName = uuidv4() + filename;
        const pathName = path.join(
          path.dirname(path.dirname(__dirname)),
          `/public/slider/${newFileName}`
        );
        await stream.pipe(fs.createWriteStream(pathName));
        images.push(newFileName);
        urls.push(`http://localhost:5000/images/${newFileName}`);
      }
      const newSlider = new Slider({
        images: images,
      });
      const result = await newSlider.save();
      return {
        urls: urls,
        _id: result._id,
      };
    },

    updateSlider: async (parent, args) => {
      const { images, sliderId, delateIndex } = await args.updateSliderInput;

      try {
        const slider = await Slider.findById({ _id: sliderId });
        let savedImages = [...slider.images];
        if (slider) {
          for (let i = 0; i < images.length; i++) {
            const file = await images[i].inputFile;
            const index = await images[i].index;
            const { createReadStream, filename, mimetype, encoding } = file;
            const stream = createReadStream();
            const newFileName = uuidv4() + filename;

            if (index < savedImages.length) {
              savedImages[index] = newFileName;
            } else {
              savedImages.push(newFileName);
            }
            const pathName = path.join(
              path.dirname(path.dirname(__dirname)),
              `/public/slider/${newFileName}`
            );
            await stream.pipe(fs.createWriteStream(pathName));
            if (newFileName) {
              fs.unlink(
                path.join(
                  path.dirname(path.dirname(__dirname)),
                  `/public/slider/${slider.images[index]}`
                ),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          }

          if (delateIndex && delateIndex.length >= 1) {
            delateIndex.map((i) => {
              fs.unlink(
                path.join(
                  path.dirname(path.dirname(__dirname)),
                  `/public/slider/${savedImages[i]}`
                ),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
              savedImages.splice(i, 1);
            });
          }
          const newSlider = {
            images: savedImages,
          };
          const result = await Slider.findOneAndUpdate(
            { _id: sliderId },
            newSlider,
            { new: true }
          );
          const urls = [];
          savedImages.map((img) =>
            urls.push(`http://localhost:5000/slider/${img}`)
          );
          return {
            urls: urls,
            _id: result._id,
          };
        } else {
          throw new Error("Slider not found");
        }
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (parent, args) => {
      const { image, title} = await args.eventInput;
      const { createReadStream, filename, mimetype, encoding } = await image;
      const stream = createReadStream();
      const newFileName = uuidv4() + filename;
      const pathName = path.join(
        path.dirname(path.dirname(__dirname)),
        `/public/images/${newFileName}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      const newEvent = new Event({
        title:title,
        image: newFileName,
      });
      const result = await newEvent.save();
      return {
        title:result.title,
        image: `http://localhost:5000/images/${newFileName}`,
        _id: result._id,
      };
    },
  },
};
