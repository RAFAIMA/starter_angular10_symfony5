<?php

namespace App\Controller;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\AbstractFOSRestController;

class BlogController extends AbstractFOSRestController
{


    /**
     * @Rest\Get("/posts", name="posts")
     * @Rest\View(StatusCode = 201)
     */
    public function index()
    {
        $posts = $this->getDoctrine()->getRepository(Post::class)
                                     ->findBy(array(), array('id'=>'desc'));
        $result = array("status" => "Yes", "posts" => $posts);
        return $this->view($result, Response::HTTP_CREATED);
    }

}
