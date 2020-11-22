<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PostController extends AbstractFOSRestController
{
    private $validator;

        public function __construct(ValidatorInterface $validator)
        {
            $this->validator = $validator;
        }

        /**
         * @Rest\Post("/api/post/new", name="create_poste_admin")
         * @Rest\View(StatusCode = 201)
         * @ParamConverter("post", converter="fos_rest.request_body")
         */
        public function addPost(Post $post,Request $request)
       {
        $errors = $this->validator->validate($post);

        if(!count($errors))
        {
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();
            $result = array("status" => "Yes", "id"=>$post->getId());
            return $this->view($result, Response::HTTP_CREATED);
        }
        else
        {
            $result = $errors;
            return $this->view($result, Response::HTTP_NOT_ACCEPTABLE);
        }
    }


    /**
     * @Rest\Get("/api/posts/post/{id}", name="show_admin_post")
     * @Rest\View(StatusCode = 200)
     */
    public function getPost(Post $post , Request $request)
    {
            $result = array("result"=>"success","post"=>$post);
            return $this->view($result,Response::HTTP_OK);
    }

    /**
     * @Rest\Post("/api/post/edit", name="update_post")
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("post", converter="fos_rest.request_body")
     */
    public function updatePost(Post $post,Request $request)
    {

        $errors = $this->validator->validate($post);

        if(!count($errors))
        {
            $post = $this->getDoctrine()->getRepository(Post::class)->find($post->getId());

            $post->setTitle($post->getTitle());
            $post->setDescription($post->getDescription());

            $em = $this->getDoctrine()->getManager();
            $em->flush();

            $result = array("result"=>"success","id" =>$post->getId());
            return $this->view($result, Response::HTTP_CREATED);
        }
        else
        {
            $result = array("result"=>"failed");
            return $this->view($result);
        }

    }

    /**
     * @Rest\Post("/api/post/delete/{id}", name="delete_post")
     */
    public function delete(Post $post ,Request $request)
    {
        $em = $this->getDoctrine()->getManager();

            $em->remove($post);
            $em->flush();


            $result = array("result"=>"success");
            return $this->view($result, Response::HTTP_CREATED);

    }

}
