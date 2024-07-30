"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CreateChatCompletionRequestMessage } from "openai";

import Heading from "@/components/Heading";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";
import { BotAvatar } from "@/components/bot-avtar";
import { UserAvatar } from "@/components/user-avtar";
import { useProModal } from "@/hooks/use-pro-modal";

const Conversation = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<CreateChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("api/conversation",
        {
          messages: newMessages,
        }
      );
      setMessages((current) => [...current, userMessage, response.data]);
    } catch (error: any) {
      if(error?.response?.status === 429) {
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <>
      <div>
        <Heading
          title="Conversation"
          description="Our most advance conversation bot"
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
        <div className="px-4 lg:px-8">
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 lg:px-8 focus-within:shadow-sm flex gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-3/4">
                    <FormControl>
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Type a message"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-1/4" disabled={isLoading}>
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 ">
        {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && <Empty label="Start typing to have a conversation." />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Conversation;
