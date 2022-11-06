const Request = require("../model/request.model");
const asyncHandler = require("express-async-handler");
const { roles } = require("../roles");

// get all requests

const getRequests = asyncHandler(async (req, res) => {
  const role = req.user.userRole;

  switch (role) {
    case "admin":
      const adminRequests = await Request.find();
      res.json(adminRequests);
      break;
    case "post":
      const postRequests = await Request.find({ status: { $in: [ "approved", "posted"] } });
      res.json(postRequests);
      break;
    case "basic":
      const requests = await Request.find({ user: req.user._id });
      res.json(requests);
      break;
    default:
      break;
  }

});

// create a request

const createRequest = asyncHandler(async (req, res) => {
  const { title, description, name, phone, address, idPic } = req.body;

  if (!title || !description || !name) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const request = new Request({
      user: req.user._id,
      title,
      description,
      name,
      phone,
      idPic,
      address,
    });

    const createdRequest = await request.save();

    res.status(201).json(createdRequest);
  }
});

// update a request

const updateRequest = asyncHandler(async (req, res) => {
  const { title, description, name, phone, address, status } = req.body;

  const request = await Request.findById(req.params.id);

  var permission = roles.can(req.user.userRole).updateAny("request");

  if (permission.granted === false) {
    if (request.user.toString() === req.user._id.toString()) {
      permission = roles.can(req.user.userRole).updateOwn("request");
    }
  }

  if (permission.granted) {
    if (request) {
      request.title = title;
      request.description = description;
      request.name = name;
      request.phone = phone;
      request.address = address;
      request.status = status;

      const updatedRequest = await request.save();
      res.json(updatedRequest);
    } else {
      res.status(404);
      throw new Error("Question not found");
    }
  } else {
    res.status(403);
    throw new Error("You don't have permission");
  }
});

// handle approve

const approveRequest = asyncHandler(async (req, res) => {
  const { title, description, name, phone, address, status } = req.body;

  const request = await Request.findById(req.params.id)

  if(request) {
    request.status = 'approved'

    const updatedRequestx = await request.save()
    res.json(updatedRequestx)
  } else {
    res.status(404)
    throw new Error("Request not found")
  }

})

// handle reject

const rejectRequest = asyncHandler(async (req, res) => {
  const { title, description, name, phone, address, status } = req.body;

  const request = await Request.findById(req.params.id)

  if(request) {
    request.status = 'rejected'

    const updatedRequestx = await request.save()
    res.json(updatedRequestx)
  } else {
    res.status(404)
    throw new Error("Request not found")
  }

})

// post request

const postRequest = asyncHandler(async (req, res) => {
  const { title, description, name, phone, address, status } = req.body;

  const request = await Request.findById(req.params.id)

  if(request) {
    request.status = 'posted'

    const updatedRequestx = await request.save()
    res.json(updatedRequestx)
  } else {
    res.status(404)
    throw new Error("Request not found")
  }

})

// delete a request

const deleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    await request.remove();
    res.json({ message: "Request Removed" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

module.exports = {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest,
  approveRequest,
  rejectRequest,
  postRequest
};
